import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ListItemSchema = new mongoose.Schema({
	content: {
		contentId: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		genres: {
			type: [{ name: { type: String }, id: { type: Number } }],
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		mediaType: {
			type: String,
			required: true,
		},
		episodes: {
			type: Number,
		},
	},
	status: {
		type: Number,
		required: true,
		default: 0,
	},
	rating: {
		type: Number,
	},
	progress: {
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
	timeWatched: {
		type: Number,
		required: true,
	},
});

const ListSchema = new mongoose.Schema({
	data: {
		series: {
			amount: {
				type: Number,
				default: 0,
			},
			time: {
				type: Number,
				default: 0,
			},
			rating: {
				type: Number,
				default: 0,
			},
		},
		movies: {
			amount: {
				type: Number,
				default: 0,
			},
			time: {
				type: Number,
				default: 0,
			},
			rating: {
				type: Number,
				default: 0,
			},
		},
		genres: {
			type: [
				{
					genre: { type: { name: { type: String }, id: { type: Number } } },
					quantity: Number,
				},
			],
		},
	},
	list: {
		type: [ListItemSchema],
		default: [],
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
		type: ListSchema,
		default: { data: { series: {}, movies: {}, genres: [] }, list: [] },
	},
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});

const UserModel = mongoose.model("user", UserSchema);

export { UserSchema, UserModel };
