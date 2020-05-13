const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList } = graphql;

const categorys = [
    { id: 1, name: 'Плитка', alt: 'tile' },
    { id: 2, name: 'Ламинат', alt: 'laminate' },
    { id: 3, name: 'Паркет', alt: 'parquet' },
];
const countrys = [
    { id: 1, name: 'Россия', alt: 'russia' },
    { id: 2, name: 'Китай', alt: 'сhina' },
    { id: 3, name: 'Италия', alt: 'italy' },
    { id: 4, name: 'Испания', alt: 'spain' },
    { id: 5, name: 'Аргентина', alt: 'argentina' },
];
const products = [
    { id: 1, name: 'Araz Milad Cenefa', categoryId: 1, size: '6.5x20', countryId: 5, price: 348 },
    { id: 2, name: 'Cube Ash Rettificato', categoryId: 1, size: '90x45', countryId: 1, price: 1705 },
    { id: 3, name: 'Орех Гикори Berkeley', categoryId: 2, size: '8x193x1383', countryId: 2, price: 15.3 },
    { id: 4, name: 'Дуб Ostana AT', categoryId: 2, size: '8x193x1383', countryId: 3, price: 18.7 },
    { id: 5, name: 'Select Shadow Grey', categoryId: 3, size: '2266x188x14', countryId: 4, price: 2690 },
    { id: 6, name: 'Concrete Grey', categoryId: 3, size: '2x2000x40000', countryId: 5, price: 717 },
];

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        alt: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return products.filter(product => product.categoryId == parent.id);
            }
        }
    }),
});
const CategoryTypeClear = new GraphQLObjectType({
    name: 'CategoryClear',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        alt: { type: GraphQLString },
        productId: { type: GraphQLInt }
    }),
});
const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        alt: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return products.filter(product => product.countryId == parent.id);
            }
        }
    }),
});
const CountryTypeClear = new GraphQLObjectType({
    name: 'CountryClear',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        alt: { type: GraphQLString },
        productId: { type: GraphQLInt }
    }),
});
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: {
            type: CategoryType,
            resolve(parent, args){
                return categorys.find(category => category.id == parent.categoryId);
            }
        },
        size: { type: GraphQLString },
        country: {
            type: CountryType,
            resolve(parent, args){
                return countrys.find(country => country.id == parent.countryId);
            }
        },
        price: { type: GraphQLFloat },
    }),
});
const ProductTypeClear = new GraphQLObjectType({
    name: 'ProductClear',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        categoryId: { type: GraphQLInt },
        size: { type: GraphQLString },
        countryId: { type: GraphQLInt },
        price: { type: GraphQLFloat },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return products.find(product => product.id == args.id);
            },
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return products;
            },
        },
        country: {
            type: CountryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return countrys.find(country => country.id == args.id);
            },
        },
        countrys: {
            type: new GraphQLList(CountryType),
            resolve(parent, args) {
                return countrys;
            },
        },
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return categorys.find(category => category.id == args.id);
            },
        },
        categorys: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return categorys;
            },
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductTypeClear,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                categoryId: { type: GraphQLInt },
                size: { type: GraphQLString },
                countryId: { type: GraphQLInt },
                price: { type: GraphQLFloat },
            },
            resolve(parent, args){
                products.push(args);
                return args;
                //return products.push( { id: args.id, name: args.name, categoryId: args.categoryId, size: args.size, countryId: args.countryId, price: args.price } );
            }
        },
        addCountry: {
            type: CountryTypeClear,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                alt: { type: GraphQLString },
            },
            resolve(parent, args){
                countrys.push(args);
                return args;
            }
        },
        deleteProduct: {
            type: ProductTypeClear,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args){
                for (keyP in products) {
                    let delProduct = products[keyP];
                    if( products[keyP].id == args.id ){
                        products.splice(keyP, 1);
                        return delProduct;
                    }
                }
            }
        },
        deleteCategory: {
            type: CategoryTypeClear,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args){
                for (keyC in categorys) {
                    let delCategory = categorys[keyC];
                    if( categorys[keyC].id == args.id ){
                        categorys.splice(keyC, 1);
                        return delCategory;
                    }
                }
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
