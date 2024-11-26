"use server";

export async function validatePassword(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const password = formData.get("password");

  console.log("Password : ", { password });

  if (password === "12345") {
    return {
      errors: ["valid", "Password is correct! Access granted."],
    };
  }

  return {
    errors: ["invalid", "Invalid password. Please try again."],
  };
}
