import { userLoginSchema } from "@/lib/types";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validatedData = userLoginSchema.safeParse(body);

  let zodErrors = {};
  if (!validatedData.success) {
    validatedData.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  if (Object.keys(zodErrors).length > 0) {
    return NextResponse.json(
      { errors: zodErrors, message: "Login failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
};
