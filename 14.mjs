// Day 14

function mapRecipes(input) {
    return Object.fromEntries(
        input.split('\n').map( row => {
            const [ingredients, result] = row.split(' => ');
            const [amt, resultmaterial] = result.split(' ');
            const recipe = ingredients.split(', ').map(
                part => {
                    const [amt, ingredient] = part.split(' ');
                    return {ingredient, amt: parseInt(amt)};
                }
            )
            // console.log([resultmaterial, {amt, recipe}])
            return [resultmaterial, {amt: parseInt(amt), recipe}];
        })
    );
}

function getOREQuantity(recipes, material, amount, spare = {}, order = [], indent = 0) {
    console.log(' '.repeat(indent), amount, material);
    // Add it to the ordering
    order.push([material, amount]);
    // If we have some spare, use it
    // if (spare[material] > 0) {
    //     console.log(' '.repeat(indent), 'Have', spare[material], material, 'spare');
    //     amount -= Math.min(spare[material], amount);
    //     spare[material] -= Math.min(spare[material], amount);
    // }
    if (amount === 0) {
        return {ore: 0, spare: {}};
    }
    if (material === 'ORE') {
        return {ore: amount, spare: {}};
    }
    // Look up the result material
    const recipe = recipes[material];
    // Figure out the factor
    const factor = Math.ceil(amount / recipe.amt);
    // Get all the component ingredients
    // console.log(' '.repeat(indent), 'Starting to make', amount, material);
    console.log(' '.repeat(indent), 'Need', recipe.recipe.map(({amt, ingredient}) => `${amt*factor}x${ingredient}`).join(', '), 'which will make', factor*recipe.amt, material, 'with', (recipe.amt * factor) - amount, 'spare');
    let ore = 0;
    // const spare = {};
    for (const {amt, ingredient} of recipe.recipe) {
        let amtNeeded = amt * factor;
        if (spare[ingredient]) {
            amtNeeded -= Math.min(spare[ingredient], amtNeeded);
            spare[ingredient] -= Math.min(spare[ingredient], amtNeeded);
        }
        if (amtNeeded) {
            const result = getOREQuantity(recipes, ingredient, amtNeeded);
            // console.log(result);
            Object.entries(result.spare).forEach(([material, amt]) => spare[material] = amt + (spare[material] || 0));
            ore += result.ore;
        }
    }
    spare[material] = (spare[material] || 0) + ((recipe.amt * factor) - amount);
    // const ore = recipe.recipe.reduce((acc, {amt, ingredient}) => acc + getOREQuantity(recipes, ingredient, amt * factor, spare, order, indent + 1), 0);
    // console.log(' '.repeat(indent), 'To make', amount, material, ore, 'ORE with', (recipe.amt * factor) - amount, 'spare')
    return {ore, spare};
}

function getOrderOfReactions(recipes, material, amount, order = []) {
    if (material === 'ORE') {
        return;
    }
    order.unshift([material, amount])
    // needed.set(material, amount + (needed.get(material)||0));
    const recipe = recipes[material];
    const factor = amount/recipe.amt;
    for (const {amt, ingredient} of recipe.recipe) {
        getOrderOfReactions(recipes, ingredient, amt * factor, order);
    }
    return order;
}

function getOreForFuel(input) {
    const recipes = mapRecipes(input);
    // console.dir(recipes, {depth: 3, colors: true});
    
    // const order = getOrderOfReactions(recipes, 'FUEL', 1);
    
    // const spare = {}, order = [];
    console.log(getOREQuantity(recipes, 'FUEL', 1));
    // console.log(spare);
    // console.dir(order);

    // let oreTaken = 0, inventory = {};
    // for (let [material, amount] of order) {
    //     // Make it ONLY with what we have in inventory and ORE
    //     if (inventory[material]) {
    //         inventory[material] -= Math.min(inventory[material], amount);
    //         amount -= Math.min(inventory[material], amount);
    //     }
    //     const recipe = recipes[material];
    //     const recipeMakes = recipe.amt;
    //     const factor = Math.ceil(amount / recipeMakes);
    //     console.log(amount, material, '<=', recipe.recipe.map(a => `${a.amt * factor} ${a.ingredient}`).join(', '))
    //     recipe.recipe.forEach(({amt, ingredient}) => {
    //         const amtNeeded = amt * factor;
    //         if (ingredient === 'ORE') {
    //             oreTaken += amtNeeded;
    //         } else {
    //             if (inventory[ingredient] >= amtNeeded) {
    //                 inventory[ingredient] -= amtNeeded;
    //             } else {
    //                 throw new Error(`Not enough ${ingredient} to make ${material}. Needed: ${amtNeeded}, Have: ${inventory[ingredient]}`);
    //             }
    //         }
    //     });
    //     console.log('Just made', recipeMakes * factor, material);
    //     inventory[material] = (inventory[material] || 0) + recipeMakes * factor;
    //     console.log(inventory);
    // }
    // console.log(oreTaken);
}

getOreForFuel(`171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`);