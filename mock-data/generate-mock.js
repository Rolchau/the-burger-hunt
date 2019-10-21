let faker = require("faker");

const AMOUNT = 30;
const USER_COUNT = 15;
const PICTURE_COUNT = 90;

/* USERS
 * - username
 * - email
 * - picture[]
 * - reviews [shops{tastescore, visualscore, texturescore}]
 */
function generateUsers() {
  let availablePictures = [...Array(PICTURE_COUNT).keys()];
  let users = [];

  for (let id = 0; id < USER_COUNT; id++) {
    let userPictures = [];
    let userName = faker.internet.userName();
    
    // Add pictures to user
    const pictureCount = faker.random.number({min: 1, max: 5});
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
      pictures: userPictures,
      reviews: []
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
  const picture = {
    id: pictureId,
    imageUrl: 'https://baconmockup.com/200/160/',
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
    const shopName = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} Burgers`;
    // // This should ofcourse not be just one value on the backend, but multiple :) 
    // const tasteScore = faker.random.number({max: 5});
    // const textureScore = faker.random.number({max: 5});
    // const visualScore = faker.random.number({max: 5});
    // const avgScore = ((tasteScore + textureScore + visualScore) / 3).toFixed(2);
    const openingHoursFrom = faker.random.number({min: 7, max: 10}) + ':00';
    const openingHoursTo = faker.random.number({min: 15, max: 22}) + ':00';
    const openingDays = 'Monday to Friday';
    const shopPictures = pictures.filter(pic => {
      if (pic.shopId === id) {
        pic.shopName = shopName;
      }
      return pic.shopId === id;
    });

    shopDetails.push({
      id: id,
      name: shopName,
      openFrom: openingHoursFrom,
      openTo: openingHoursTo,
      openDays: openingDays,
      pictures: shopPictures,
      reviews: [],
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
    });
  }
  return shopList;
}

function generateReviews(users, shopDetails) {
  let reviews = [];
  for(let id = 0; id < shopDetails.length; id++) {
    const shop = shopDetails[id];
    const userArr = [...Array(users.length).keys()];

    const noOfTotalReviews = faker.random.number({min: 0, max: users.length / 2});    
    for (let index = 0; index < noOfTotalReviews; index++) {
      const userNo = faker.random.number({min: 0, max: userArr.length - 1});
      const currUser = userArr.splice(userNo, 1)[0];
      const user = users[currUser];
      user.reviews.push(reviews.length);
      user.reviewCount = user.reviews.length;
      reviews.push({
        id: reviews.length,
        shopId: shop.id,
        userId: user.id,
        tasteScore: faker.random.number({min: 1, max: 5}),
        textureScore: faker.random.number({min: 1, max: 5}),
        visualScore: faker.random.number({min: 1, max: 5}),
      })
    }
  }
  return reviews;
}

function updateReviewScores(shopDetails, reviews) {
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const shop = shopDetails[review.shopId];
    shop.reviews.push(review.id);
  }
}

let generateMock = () => {  
  let users = generateUsers();
  let shopDetails = generateShopDetails();
  let reviews = generateReviews(users, shopDetails);
  let shopList = generateShopList(shopDetails);
  
  updateReviewScores(shopDetails, reviews);

  return {
    pictures: pictures, 
    shoplist: shopList,
    reviews: reviews,
    shopDetails: shopDetails,
    users: users,
  };
};

module.exports = generateMock;
