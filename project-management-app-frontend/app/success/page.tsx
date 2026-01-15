

export default function Successful_login() {
    return (
        <div className="text-5xl"> login successful</div>
    )
}



// Got it ✅ — you want to **add a button that saves the uploaded screenshot to a local location (like `public/uploads/bugs/` in your Next.js app)**, stores the **file path (not base64)** in a variable, and then sends that to your backend so it can be saved in the DB.

// Here’s the **clean, working way** to do this with Next.js **App Router + useActionState + server actions**:

// ---

// ### 🧩 Step 1: Add a "Save Screenshot" upload button in your component

// Modify the section where you upload the screenshot.
// Instead of storing base64 in localStorage, we’ll upload the file to your own `/api/upload-screenshot` route and get the saved file path back.

// ```tsx
// // inside your CreateNewBug component

// const [screenshotPath, setScreenshotPath] = useState<string | null>(null);
// const [uploading, setUploading] = useState(false);

// const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   setUploading(true);
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await fetch("/api/upload-screenshot", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await res.json();
//   setUploading(false);

//   if (res.ok) {
//     setScreenshotPath(data.filePath); // ✅ store path returned from server
//   } else {
//     alert("Failed to upload screenshot");
//   }
// };
// ```

// Now replace your upload section with this:

// ```tsx
// {/* UPLOAD SCREENSHOT */}
// <div className="mt-4">
//   <label htmlFor="screenshot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//     Screenshot (optional)
//   </label>

//   <input
//     type="file"
//     id="screenshot"
//     accept="image/png, image/jpeg"
//     onChange={handleScreenshotUpload}
//     className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400"
//   />

//   {uploading && <p className="text-blue-500 text-sm mt-2">Uploading...</p>}

//   {screenshotPath && (
//     <div className="mt-3 flex flex-col items-start">
//       <p className="text-sm text-gray-600 mb-1">Preview:</p>
//       <img
//         src={screenshotPath}
//         alt="Bug screenshot preview"
//         className="max-w-full h-auto rounded-md border border-gray-300"
//       />
//       <button
//         type="button"
//         onClick={() => setScreenshotPath(null)}
//         className="mt-2 text-xs text-red-600 hover:underline"
//       >
//         Remove Screenshot
//       </button>
//     </div>
//   )}

//   <input type="hidden" name="screenshot_path" value={screenshotPath ?? ""} />
// </div>
// ```

// ---

// ### 🧩 Step 2: Add your API route `/api/upload-screenshot/route.ts`

// Create this file:
// `/app/api/upload-screenshot/route.ts`

// ```ts
// import { writeFile } from "fs/promises";
// import path from "path";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // ✅ Save inside public/uploads/bugs
//   const uploadDir = path.join(process.cwd(), "public", "uploads", "bugs");
//   await writeFile(`${uploadDir}/${file.name}`, buffer);

//   const filePath = `/uploads/bugs/${file.name}`;
//   return NextResponse.json({ filePath });
// }
// ```

// 👉 You might need to create the folder manually:

// ```bash
// mkdir -p public/uploads/bugs
// ```

// ---

// ### 🧩 Step 3: Update your server action to include screenshot_path

// Update your `CreateBug` function:

// ```ts
// body: JSON.stringify({
//   title: result.data.title,
//   description: result.data.description,
//   project_id: result.data.project_id,
//   assigned_developer_id: result.data.assigned_developer_id,
//   assigned_qa_id: result.data.assigned_qa_id,
//   createdAt: new Date().toISOString(),
//   Deadline: new Date(result.data.Deadline).toISOString(),
//   status: result.data.status,
//   screenshot_path: result.data.screenshot_path || "", // ✅ added
// }),
// ```

// ---

// ### ✅ Result

// Now:

// * When you upload a screenshot, it’s saved in `public/uploads/bugs/`
// * The API returns its URL path (e.g., `/uploads/bugs/screenshot.png`)
// * The form includes `screenshot_path` as a hidden field
// * `CreateBug` sends that to your backend and stores it in DB

// ---

// Would you like me to modify your `CreateBug` server action fully (with proper validation for screenshot)?
