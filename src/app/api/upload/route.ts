// app/api/upload/route.ts

import { writeFile, access } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const title = data.get("title") as string;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ambil extension
    const ext = file.name.split(".").pop();

    // 🔥 clean title jadi slug
    const safeTitle = (title || "image")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    let fileName = `${safeTitle}.${ext}`;
    let filePath = path.join(process.cwd(), "public/images", fileName);

    // 🔥 optional: biar gak ketimpa kalau nama sama
    let counter = 1;
    while (true) {
      try {
        await access(filePath);
        fileName = `${safeTitle}-${counter}.${ext}`;
        filePath = path.join(process.cwd(), "public/images", fileName);
        counter++;
      } catch {
        break;
      }
    }

    await writeFile(filePath, buffer);

    return Response.json({
      url: `/images/${fileName}`,
    });
  } catch (err) {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}