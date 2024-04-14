import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ListItemSchema = new mongoose.Schema({
	content: {
		contentId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		genres: {
			type: [String],
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		type: {
			// 0 - Película | 1 - Serie
			type: Number,
			required: true,
		},
		episodes: {
			type: Number,
		},
	},
	status: {
		// 0 - Planeado | 1 - En curso | 2 - Completado
		type: Number,
		required: true,
		default: 0,
	},
	score: {
		type: Number,
	},
	progress: {
		// Campo único de series para llevar cuenta de los episodios
		type: Number,
	},
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date,
	},
	notes: {
		type: String,
	},
});

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	emailVerified: {
		type: Boolean,
		required: true,
		default: false,
	},
	verificationToken: { type: String, default: null },
	mediaList: {
		type: [ListItemSchema],
		default: [],
	},
});

// Antes de guardar el usuario en la base de datos, hasheamos la contraseña
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	try {
		const hashedPassword = await bcrypt.hash(this.password, 10); // Número de rondas de hash (10 es un valor seguro)
		this.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});

const UserModel = mongoose.model("user", UserSchema);

export { UserSchema, UserModel };
