// app/api/upload/route.ts

import { writeFile, access, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    // 🔥 ambil semua file (support multiple)
    const files = data.getAll("file") as File[];
    const title = (data.get("title") as string) || "image";

    if (!files || files.length === 0) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/images");

    // 🔥 pastikan folder ada
    await mkdir(uploadDir, { recursive: true });

    // 🔥 slug title
    const safeTitle = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const urls: string[] = [];

    for (const file of files) {
      // 🔥 validasi tipe file
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = file.name.split(".").pop() || "jpg";

      let fileName = `${safeTitle}-${Date.now()}.${ext}`;
      let filePath = path.join(uploadDir, fileName);

      // 🔥 anti overwrite (double safety)
      let counter = 1;
      while (true) {
        try {
          await access(filePath);
          fileName = `${safeTitle}-${Date.now()}-${counter}.${ext}`;
          filePath = path.join(uploadDir, fileName);
          counter++;
        } catch {
          break;
        }
      }

      await writeFile(filePath, buffer);

      urls.push(`/images/${fileName}`);
    }

    return Response.json({
      urls, // 🔥 array (penting buat gallery)
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}