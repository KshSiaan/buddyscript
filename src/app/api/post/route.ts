export async function POST(request: Request) {
  const body = await request.formData();
  const text = body.get("text");
  const is_private = body.get("is_private");
  //images[n] is the key for the images in the form data

  const images = body.getAll("images") as File[];

  console.log({
    text,
    images: images.map((img) => (img instanceof File ? img.size : null)),
    is_private,
  });

  return Response.json({
    message: "Post created successfully",
    data: {
      text,
      images: images.map((img) => (img instanceof File ? img.name : null)),
      is_private,
    },
  });
}
