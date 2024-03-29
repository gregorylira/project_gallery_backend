const paths = {
  "/api/posts": {
    post: {
      summary: "postagem de image",
      description: "essa rota sera responsavel por postar as imagens",
      tags: ["Image"],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Image",
            },
            examples: {
              tag: {
                value: {
                  email: "ademir@ademir.com",
                  password: "12345",
                },
              },
            },
          },
        },
      },
      responses: {
        "401": {
          description: "Unauthorized",
        },
        "400": {
          description: "Invalid tag post",
        },
        "201": {
          description: "OK",
          content: {
            "application/json": {},
          },
        },
      },
    },
    get: {
      summary: "Listagem de imagem",
      description: "essa rota sera responsavel por listar todas as imagem",
      tags: ["Image"],
      parameters: [
        {
          name: "tag",
          in: "query",
          description: "nome da tag",
        },
        {
          name: "nsfw",
          in: "query",
          description: "booleano",
        },
        {
          name: "page",
          in: "query",
          description: "booleano",
        },
      ],
      responses: {
        "401": {
          description: "Unauthorized",
        },
        "400": {
          description: "Invalid tag post",
        },
        "201": {
          description: "OK",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/api/posts/{id}": {
    delete: {
      summary: "Deletar imagem por id",
      description: "essa rota sera responsavel por deletar imagens",
      tags: ["Image"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "id da imagem",
          require: true,
        },
      ],
      responses: {
        "400": {
          description: "Imagem não foi encontrada",
        },
        "200": {
          description: "OK",
        },
      },
    },
  },
  "/api/posts/tags": {
    get: {
      summary: "Listagem de todas as tags",
      description: "essa rota sera responsavel por listar todas as tags",
      tags: ["Image"],

      responses: {
        "401": {
          description: "Unauthorized",
        },
        "400": {
          description: "Invalid tag post",
        },
        "200": {
          description: "OK",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/api/posts/find/{id}": {
    get: {
      summary: "procurar imagem por id",
      description: "essa rota sera responsavel por pegar imagens",
      tags: ["Image"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "id da imagem",
          require: true,
        },
      ],
      responses: {
        "400": {
          description: "Imagem não foi encontrada",
        },
        "200": {
          description: "OK",
        },
      },
    },
  },
};

export default paths;
