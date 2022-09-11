import { NextFunction, Request, Response } from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";
import createCustomError from "../../utils/createCustomError";

const supabase = createClient(
  "https://rzbtimjofxzmsruyepog.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YnRpbWpvZnh6bXNydXllcG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI3MTc0MzAsImV4cCI6MTk3ODI5MzQzMH0.XHo_s5xw7yvVwZIAtY_ePcea3OALj3yphZ_ZfM_gYKA"
);

const supaBaseUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { handImage } = req.body;

  const imagePath = path.join("uploads", handImage);

  try {
    const fileData = await readFile(imagePath);

    const storage = supabase.storage.from("poker-hands");

    const uploadResult = await storage.upload(handImage, fileData);

    if (uploadResult.error) {
      next(uploadResult.error);
      return;
    }

    const { publicURL } = storage.getPublicUrl(handImage);

    req.body.handImageBackup = publicURL;
    next();
  } catch (error) {
    const newError = createCustomError(
      500,
      "Can't upload the image",
      "Can't upload the image"
    );
    next(newError);
  }
};

export default supaBaseUpload;
