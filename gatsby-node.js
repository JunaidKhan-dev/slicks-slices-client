const path = require(`path`);
const fetch = require('isomorphic-fetch');
const { Z_PARTIAL_FLUSH } = require('zlib');

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // get template for this page
  const { createPage } = actions;
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //   query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // loop each pizza and create page
  data.pizzas.nodes.forEach((pizza) => {
    createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  // get template for this page
  const { createPage } = actions;
  const pizzaTemplate = path.resolve('./src/pages/pizzas.js');
  //   query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);
  // loop each pizza and create page
  data.toppings.nodes.forEach((topping) => {
    createPage({
      path: `topping/${topping.name}`,
      component: pizzaTemplate,
      context: {
        toppingName: `/${topping.name}/`,
      },
    });
  });
};

const getFetchBeersandTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // fetch a list of beer
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // loop and create node for beer
  beers.forEach((beer) => {
    const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: `Beer`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  // query all slicemaster
  const { data } = await graphql(`
    query {
      persons: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: turn each slicemaster into page
  // figure out how many pages based on how many slicemaster and how many on per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.persons.totalCount) / pageSize;
  console.log(
    `total people ${data.persons.totalCount} and we have ${pageCount} pages`
  );
  // loop from 1 to n - and create the pages
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });

  // create each page for Slicemaster
  data.persons.nodes.forEach((person) => {
    actions.createPage({
      path: `/slicemaster/${person.slug.current.toLowerCase()}`,
      component: path.resolve('./src/templates/slicemaster.js'),
      context: {
        slug: person.slug.current,
      },
    });
  });
};
// turn Beers into pages
const turnBeersIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allBeer {
        totalCount
      }
    }
  `);

  const totalBeers = data.allBeer.totalCount;
  const beersPerPage = 8;
  const totalPages = Math.ceil(parseInt(totalBeers) / beersPerPage);

  const { createPage } = actions;
  const baseUrl = '/beers/';
  Array.from({ length: totalPages }).forEach((_, i) => {
    i += 1;

    createPage({
      path: `${i === 1 ? baseUrl : baseUrl + i}`,
      component: path.resolve(`./src/templates/beers.js`),
      context: {
        limit: beersPerPage,
        skip: beersPerPage * (i - 1),
        currentPage: i,
        totalPages,
      },
    });
  });
};
// sourcing nodes (each pice of data is known as node)
exports.sourceNodes = async (params) => {
  // fetch a list of bears and source then into gatsby API
  await getFetchBeersandTurnIntoNodes(params);
};

exports.createPages = async (params) => {
  // create pages dynamically
  // pizzas
  await turnPizzasIntoPages(params);
  // toppings
  await turnToppingsIntoPages(params);
  // slicmasters
  await turnSlicemastersIntoPages(params);
  // beer pages
  await turnBeersIntoPages(params);
};
