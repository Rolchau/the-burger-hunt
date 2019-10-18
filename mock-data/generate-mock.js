let faker = require("faker");

const AMOUNT = 30;
const USER_COUNT = 15;
const PICTURE_COUNT = 90;

/* USERS
 * - username
 * - email
 * - picture[]
 */
function generateUsers() {
  let availablePictures = [...Array(PICTURE_COUNT).keys()];
  let users = [];

  for (let id = 0; id < USER_COUNT; id++) {
    let userPictures = [];
    let userName = faker.internet.userName();
    const pictureCount = faker.random.number({min: 0, max: 4});
    for (let i = 0; i < pictureCount; i++) {
      const randomImgNo = faker.random.number({min: 0, max: availablePictures.length});
      const pictureAdded = availablePictures.splice(randomImgNo, 1)[0];
      if (pictureAdded !== undefined) {
        userPictures.push(pictureAdded);
        addPicture(pictureAdded, id, userName);
      }
    }

    users.push({
      id: id,
      username: userName,
      email: faker.internet.email(),
      pictures: userPictures
    });
  }
  return users;
}

/* PICTURE
 * - id 
 * - shopId
 * - userId
 * - userName
 */
let pictures = [];
function addPicture(pictureId, userId, username) {
  let picture = {
    id: pictureId,
    imageUrl: faker.image.food(),
    shopId: faker.random.number({min: 0, max: AMOUNT}),
    userId: userId,
    userName: username,
  }
  pictures.push(picture);
}

/* Burger Shop Details (When clicking on shop from shop list)
 * - id 
 * - name
 * - score
 * - opening hours
 * - pictures []
 */
function generateShopDetails() {
  let shopDetails = [];
  for (let id = 0; id < AMOUNT; id++) {
    const shopName = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} Burger`;
    // This should ofcourse not be just one value on the backend, but multiple :) 
    const tasteScore = faker.random.number({max: 5});
    const textureScore = faker.random.number({max: 5});
    const visualScore = faker.random.number({max: 5});
    const avgScore = ((tasteScore + textureScore + visualScore) / 3).toFixed(2);
    const openingHoursFrom = faker.random.number({min: 7, max: 10}) + ':00';
    const openingHoursTo = faker.random.number({min: 15, max: 22}) + ':00';
    const openingDays = 'Monday to Friday';
    const shopPictures = pictures.filter(pic => {
      return pic.shopId === id;
    });

    shopDetails.push({
      id: id,
      name: shopName,
      tasteScore: tasteScore,
      textureScore: textureScore,
      visualScore: visualScore,
      avgScore: avgScore,
      openFrom: openingHoursFrom,
      openTo: openingHoursTo,
      openDays: openingDays,
      pictures: shopPictures
    });
  }
  return shopDetails;
}

/* Burger Shop List items (For overview)
 * - id 
 * - name
 * - score
 */
function generateShopList(shopDetails) {
  let shopList = [];
  for(let id = 0; id < shopDetails.length; id++) {
    shopList.push({
      id: shopDetails[id].id,
      name: shopDetails[id].name,
      score: shopDetails[id].avgScore
    });
  }
  return shopList;
}

let generateMock = () => {  
  let users = generateUsers();
  let shopDetails = generateShopDetails();
  let shopList = generateShopList(shopDetails);

  return {
    pictures: pictures, 
    shopDetails: shopDetails,
    shoplist: shopList,
    users: users
  };
};

module.exports = generateMock;
