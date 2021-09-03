const resolvers = {
    Query: {
        hello: async function(_, args){
            let value;
            if(args.name) value = args.name;
            else value = "hello world";

            return {value};
        }
    }
}

module.exports = resolvers;