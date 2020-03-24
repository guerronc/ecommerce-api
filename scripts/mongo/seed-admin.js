const bcrypt = require("bcrypt");
const chalk = require("chalk");

const config = require("../../config");
const MongoLib = require("../../lib/mongo");

const buildAdminUser = password => {
  return {
    password,
    username: config.authAdminUserName,
    email: config.authAdminEmail
  };
};

const hasAdminUser = async mongoDb => {
  const adminUser = await mongoDb.getAll("users", {
    username: config.authAdminUserName
  });
  return adminUser && adminUser.length;
};

const createAdminUser = async(mongoDb) =>{
    const hashedPassword = await bcrypt.hash(config.authAdminPassword,10);
    const userId = await mongoDb.create("users", buildAdminUser(hashedPassword));
    return userId;
}
 const seedAdmin = async () =>{
    try {
        const mongoDb = new MongoLib();
        if(await hasAdminUser(mongoDb)){
            console.log(chalk.yellow('Admin user already exist'));
            return process.exit(1);
        }
        const adminUserId = await createAdminUser(mongoDb);
        console.log(chalk.green('Admin user created whit id: ', adminUserId));
        return process.exit(0);
    } catch (error) {
        console.log(chalk.red(error));
        process.exit(1);
    }
}

seedAdmin();