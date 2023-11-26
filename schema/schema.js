import mongoose from "mongoose";


const userSchema = new mongoose.Schema{
    
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
          avatar: {
            avatarURL: String,
          }
      
}

const Contact = mongoose.model("contact", userSchema);

export { Contact }