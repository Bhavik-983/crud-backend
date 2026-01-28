

import { Document } from "mongoose";
import mongoose from "mongoose";

export interface ITask extends Document {
  title: string;
  status: string;
  fk_user_id: mongoose.Schema.Types.ObjectId;
}

