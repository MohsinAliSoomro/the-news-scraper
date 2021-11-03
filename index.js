const express = require("express")();
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT | 5000;

// const getTheNews = async () => {
//   const { data } = await axios.get("https://www.thenews.com.pk/");
//   const $ = cheerio.load(data);
//   $("ul li a", data).each(function (index, element) {
//     const title = $(element).find(".heading-cat").text().replace("\n", "");
//     const href = $(this).attr("href");
//     const image = $(element).find(".news-pic").find("img").attr("data-src");
//   });
// };
// getTheNews();

express.get("/", (req, res) => {
  res.send({ message: "server is running" });
});
console.log("commit")
//const getSportNews = async () => {
//   const { data } = await axios.get(
//     "https://www.thenews.com.pk/latest/category/sports"
//   );
//   const $ = cheerio.load(data);
//   $(".detail-center ul li", data).each(function (index, element) {
//     const commonClass = $(element).find(".latest-right");
//     const image = $(element).find("a").find("img").attr("src");
//     const title = commonClass.find("h2").text();
//     const description = commonClass.find("p").text();
//     const date = commonClass.find("span").text();
//   });
// };

// getSportNews();

const THE_NEWS = [];

express.get("/the-news", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.thenews.com.pk/");

    const $ = cheerio.load(data);

    $(".content ul li a", data).each(function (index, element) {
      const title = $(this).text();
      const url = $(this).attr("href");
      const image = $(element).find(".news-pic").find("img").attr("data-src");

      THE_NEWS.push({ title, url, image: image ? image : "null" });
    });

    res.send(THE_NEWS);
  } catch (error) {
    res.send(error);
    console.log("the news error", error);
  }
});
const THE_SPORTS = [];
express.get("/the-sport", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.thenews.com.pk/latest/category/sports"
    );
    const $ = cheerio.load(data);
    $(".detail-center ul li", data).each(function (index, element) {
      const commonClass = $(element).find(".latest-right");
      const image = $(element).find("a").find("img").attr("src");
      const title = commonClass.find("h2").text().trim();
      const description = commonClass.find("p").text().replace(/\//g, "");
      const date = commonClass.find("span").text().replace("\n", "");

      THE_SPORTS.push({ image, title, description, date });
    });
    res.send(THE_SPORTS);
  } catch (error) {
    res.send(error);
    console.log("the news error", error);
  }
});

const THE_WORDS = [];
express.get("/the-world", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.thenews.com.pk/latest/category/world"
    );
    const $ = cheerio.load(data);
    $(".detail-center ul li", data).each(function (index, element) {
      const commonClass = $(element).find(".latest-right");
      const image = $(element).find("a").find("img").attr("src");
      const title = commonClass.find("h2").text().trim();
      const description = commonClass.find("p").text().replace(/\//g, "");
      const date = commonClass.find("span").text().replace("\n", "");

      THE_WORDS.push({ image, title, description, date });
    });
    res.send(THE_WORDS);
  } catch (error) {
    res.send(error);
    console.log("the news error", error);
  }
});

const THE_POPULAR = [];
express.get("/the-sci-tech", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.thenews.com.pk/latest/category/sci-tech"
    );
    const $ = cheerio.load(data);
    $(".most-popular-box", data).each(function (index, element) {
      const image = $(this).find("a").find("img").attr("src");
      const url = $(this).find("a").attr("href");
      const title = $(this).find(".heading-cat").text().replace("\n", " ");
      THE_POPULAR.push({ image, title, url });
    });
    res.send(THE_POPULAR);
  } catch (error) {
    res.send(error);
    console.log("the news error", error);
  }
});

express.listen(PORT, () => console.log("Server is running on port 4000"));
