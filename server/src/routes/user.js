import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { UserModel } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const secretToken = process.env.SECRET;
const serverURL = process.env.SERVER_URL;

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password, email } = req.body;

		const usernameLowerCase = username.toLowerCase();

		const user = await UserModel.findOne({ username: usernameLowerCase });

		if (user) {
			return res.status(400).json({
				error: "USER_ALREADY_EXISTS",
				message: "Este usuario ya ha sido registrado",
			});
		}

		const emailCheck = await UserModel.findOne({ email: email });

		if (emailCheck) {
			return res.status(400).json({
				error: "EMAIL_ALREADY_EXISTS",
				message: "Esta dirección de correo ya ha sido registrada",
			});
		}

		const newUser = new UserModel({
			username: username,
			password: password,
			email: email,
		});
		await newUser.save();

		const confirmationToken = generateToken(newUser._id);
		const encodedToken = Buffer.from(confirmationToken).toString("base64");
		const userToken = await UserModel.findOneAndUpdate(
			{ _id: newUser._id },
			{ verificationToken: confirmationToken },
			{ new: true }
		);

		const transporter = nodemailer.createTransport({
			service: "Gmail",
			secure: true,
			auth: {
				user: process.env.EMAIL_SENDER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const html = `
        <p>Hola ${username},</p>
        <p>Gracias por registrarte en nuestra aplicación.</p>
        <p>Para activar tu cuenta, haz clic en el siguiente enlace:</p>
        <a href="${serverURL}/auth/verify/${encodedToken}">Verificar mi cuenta</a>
      `;

		const mailOptions = {
			from: process.env.EMAIL_SENDER,
			to: req.body.email,
			subject: "Confirmación de registro",
			html: html,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: "Registro exitoso" });
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

function generateToken(userId) {
	const secret = secretToken;
	const payload = { userId };
	const options = { expiresIn: "1d" };
	const token = jwt.sign(payload, secret, options);
	return token;
}

router.post("/login", async (req, res) => {
	const { identifier, password } = req.body; // "identifier" puede ser email o username

	const user = await UserModel.findOne({
		$or: [{ email: identifier }, { username: identifier }],
	});

	if (!user) {
		return res.json({
			error: "USER_NOT_FOUND",
			message: "Usuario no encontrado",
		});
	}
	if (!user.emailVerified) {
		return res.json({
			error: "EMAIL_NOT_VERIFIED",
			message:
				"Por favor, verifica tu dirección de correo electrónico antes de iniciar sesión",
		});
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.json({
			error: "PASS_NOT_CORRECT",
			message: "La contraseña introducida no es correcta",
		});
	}

	const token = jwt.sign({ id: user._id }, "secret");
	res.json({ token, userID: user._id });
});

router.post("/checkuser", async (req, res) => {
	const { username } = req.body;

	const user = await UserModel.findOne({ username: username });

	if (!user) {
		return res.json({ value: true });
	} else {
		return res.json({ value: false });
	}
});

router.post("/checkemail", async (req, res) => {
	const { email } = req.body;

	const check = await UserModel.findOne({ email: email });

	if (!check) {
		return res.json({ value: true });
	} else {
		return res.json({ value: false });
	}
});

router.post("/checkpassword", async (req, res) => {
	const { password } = req.body;

	if (password.length < 8) {
		return res.status(400).json({
			error: "INVALID_PASSWORD",
			message: "La contraseña debe tener al menos 8 caracteres",
		});
	}

	/*const containsNumber = /\d/.test(password);
	if (!containsNumber) {
		return res.status(400).json({
			error: "INVALID_PASSWORD",
			message: "La contraseña debe contener al menos un número",
		});
	}*/

	res.status(200).json({ message: "La contraseña es válida" });
});

const verifyToken = (token) => {
	const secret = secretToken;
	try {
		const decoded = jwt.verify(token, secret);
		return decoded.userId;
	} catch (err) {
		return null;
	}
};

router.get("/verify/:token", async (req, res) => {
	const token = req.params.token;
	const decodedToken = Buffer.from(token, "base64").toString("utf-8");
	const userId = verifyToken(decodedToken);

	if (userId) {
		const user = await UserModel.findOneAndUpdate(
			{ _id: userId, verificationToken: decodedToken },
			{ emailVerified: true, verificationToken: null },
			{ new: true }
		);
		if (user) {
			res.redirect(process.env.CLIENT_URL + "/auth");
		} else {
			res.status(400).send("El token de verificación no es válido.");
		}
	} else {
		res.status(400).send("El token de verificación no es válido.");
	}
});

export { router as userRouter };
