const express = require("express");
const { prisma } = require("../generated/prisma-client")
const router = express.Router();

async function createArticle(data) {
  const newArticle = await prisma.article.create({
    data: {
      title: data.title,
      content: data.content,
      image: data.image,
      status: data.status,
      theme: {
        connect: { id: data.themeId },
      },
    },
  });
  return newArticle;
}

async function getArticles() {
  const articles = await prisma.article.findMany();
  return articles;
}

async function updateArticleStatus(id) {
  const updatedArticle = await prisma.article.update({
    where: { id },
    data: { status: true },
  });
  return updatedArticle;
}

async function deleteArticle(id) {
  const deletedArticle = await prisma.article.delete({
    where: { id },
  });
  return deletedArticle;
}

class ArticleController {
  async create(req, res) {
    try {
      const newArticle = await createArticle(req.body);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const articles = await getArticles();
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedArticle = await updateArticleStatus(req.body.id);
      res.status(200).json(updatedArticle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedArticle = await deleteArticle(req.body.id);
      res.status(200).json(deletedArticle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ArticleController();
