import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WaiterApp API',
      version: '1.0.0',
      description: `
        API para sistema de pedidos de restaurante

        ## Funcionalidades
        - Gerenciamento de categorias
        - Gerenciamento de produtos com upload de imagens
        - Sistema de pedidos com controle de status
        - Upload e visualização de imagens

        ## Status dos Pedidos
        - **WAITING**: Aguardando preparo
        - **IN_PRODUCTION**: Em produção
        - **DONE**: Finalizado

        ## Upload de Arquivos
        As imagens dos produtos são enviadas via multipart/form-data e armazenadas no servidor.
        O caminho das imagens pode ser acessado via: \`/uploads/{imagePath}\`
      `,
      contact: {
        name: 'API Support',
        email: 'support@waiterapp.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      },
    ],
    components: {
      schemas: {
        Category: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único da categoria',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              description: 'Nome da categoria',
              example: 'Pizzas',
              minLength: 1,
              maxLength: 100
            },
            icon: {
              type: 'string',
              description: 'Emoji representando a categoria',
              example: '🍕'
            }
          }
        },
        CategoryInput: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome da categoria',
              example: 'Pizzas',
              minLength: 1,
              maxLength: 100
            },
            icon: {
              type: 'string',
              description: 'Emoji representando a categoria',
              example: '🍕'
            }
          }
        },
        Ingredient: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Mussarela'
            },
            icon: {
              type: 'string',
              example: '🧀'
            },
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439012'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'category'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do produto',
              example: '507f1f77bcf86cd799439013'
            },
            name: {
              type: 'string',
              description: 'Nome do produto',
              example: 'Pizza Margherita',
              minLength: 1,
              maxLength: 100
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do produto',
              example: 'Deliciosa pizza com molho de tomate artesanal, mussarela fresca e manjericão',
              maxLength: 500
            },
            imagePath: {
              type: 'string',
              description: 'Nome do arquivo da imagem do produto',
              example: '1640995200000.png'
            },
            price: {
              type: 'number',
              description: 'Preço do produto em centavos (R$ 40,00 = 4000)',
              example: 4000,
              minimum: 0
            },
            ingredients: {
              type: 'array',
              description: 'Lista de ingredientes do produto',
              items: {
                $ref: '#/components/schemas/Ingredient'
              }
            },
            category: {
              oneOf: [
                { type: 'string', example: '507f1f77bcf86cd799439011' },
                { $ref: '#/components/schemas/Category' }
              ],
              description: 'ID da categoria do produto ou objeto da categoria (quando populado)'
            }
          }
        },
        OrderProduct: {
          type: 'object',
          required: ['product', 'quantity'],
          properties: {
            product: {
              oneOf: [
                { type: 'string', example: '507f1f77bcf86cd799439013' },
                { $ref: '#/components/schemas/Product' }
              ],
              description: 'ID do produto ou objeto do produto (quando populado)'
            },
            quantity: {
              type: 'number',
              description: 'Quantidade do produto no pedido',
              example: 2,
              minimum: 1
            },
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439014'
            }
          }
        },
        Order: {
          type: 'object',
          required: ['table', 'products'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do pedido',
              example: '507f1f77bcf86cd799439015'
            },
            table: {
              type: 'string',
              description: 'Número ou identificador da mesa',
              example: '1',
              minLength: 1,
              maxLength: 10
            },
            status: {
              type: 'string',
              enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
              description: 'Status atual do pedido',
              example: 'WAITING'
            },
            products: {
              type: 'array',
              description: 'Lista de produtos do pedido',
              items: {
                $ref: '#/components/schemas/OrderProduct'
              },
              minItems: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de criação do pedido',
              example: '2023-01-01T12:00:00.000Z'
            }
          }
        },
        OrderInput: {
          type: 'object',
          required: ['table', 'products'],
          properties: {
            table: {
              type: 'string',
              description: 'Número ou identificador da mesa',
              example: '1',
              minLength: 1,
              maxLength: 10
            },
            products: {
              type: 'array',
              description: 'Lista de produtos do pedido',
              items: {
                type: 'object',
                required: ['product', 'quantity'],
                properties: {
                  product: {
                    type: 'string',
                    description: 'ID do produto',
                    example: '507f1f77bcf86cd799439013'
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantidade do produto',
                    example: 2,
                    minimum: 1
                  }
                }
              },
              minItems: 1
            }
          }
        },
        OrderStatusUpdate: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
              description: 'Novo status do pedido',
              example: 'IN_PRODUCTION'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Categoria não encontrada'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Dados inválidos'
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'name'
                  },
                  message: {
                    type: 'string',
                    example: 'Nome é obrigatório'
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ValidationError: {
          description: 'Erro de validação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/router.ts'], // Caminho para os arquivos que contêm as anotações
};

const specs = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'WaiterApp API Documentation'
  }));
  console.log('📚 Swagger UI disponível em: http://localhost:3000/api-docs');
}
