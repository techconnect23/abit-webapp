import express from "express";

const router = express.Router();

router.get("/",(req, res) => {
  console.log("Redirect: Home page");
  res.render("home");
})

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
res.redirect("/");
});


export default router;