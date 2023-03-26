const { google } = require("googleapis");

(async () => {
  const blogger = google.blogger({
    version: "v3",
    auth: "AIzaSyDwcG5hIu2gO3ldkrXJ_TjykZj0uWXLlVc",
  });

//   console.log(drive);

//   const about = drive.drives;

//   const res = await about.get({});

//   console.log(res.data);

const params = {
    blogId: '3213900'
  };
  
  // get the blog details
  blogger.blogs.get(params, (err, res) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(`The blog url is ${res.data.url}`);
  });
})();
