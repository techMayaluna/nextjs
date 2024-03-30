// export an async GET function. This is a convention in NextJS
export async function GET(request, { params }) {
  // filename for the file that the user is trying to download
  const filename = params.filename;

  // Get the 'url' search parameter
  const urlParam = new URL(request.url).searchParams.get("url");

  // use fetch to get a response
  const response = await fetch(urlParam);

  // return a new response but use 'content-disposition' to suggest saving the file to the user's computer
  return new Response(response.body, {
    headers: {
      ...response.headers, // copy the previous headers
      "content-disposition": `attachment; filename="${filename}"`,
    },
  });
}
