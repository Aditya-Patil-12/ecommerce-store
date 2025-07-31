// const mongoose = require("mongoose");
// const childSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       minlength: 3,
//       maxlength: 100,
//       default: "",
//     },
//   },
//   { _id: true }
// );
// const parentSchema = mongoose.Schema({
//   name: {
//     type: String,
//     minlength: 3,
//     maxlength: 50,
//     required: [true, "Please Provide Username"],
//   },
//   addresses: {
//     type: [childSchema],
//     default: [],
//   },
// });
// const ParentModel = new mongoose.model("Parent", parentSchema);
// const fun = async () =>{
//   const temp = { fullName: "Aditya" };
//   // const doc = await ParentModel.create({
//   //   name: "Adi",
//   //   addresses: [{ fullName: "Aditya" }],
//   // });
//   // console.log(doc);
//   // const allDoc = await ParentModel.find({});
//   // console.log(allDoc);

// //   // addition ...
//   const singleDoc = await ParentModel.findOne({
//     _id: "6841aa43a4c1c2e87e98209b",
//   });
// //   // console.log(singleDoc);
// //   // singleDoc.addresses.push(temp);
// //   // console.log(singleDoc);
// //   // await singleDoc.save();
// //   const newAddresses = [
// //     {
// //       _id: "6841aa43a4c1c2e87e98209c",
// //       fullName: "Adi",
// //     },
// //   ];
// //   // updation ...
// //   for (let address of newAddresses) {
// //     console.log(address.id);    
// //     const newDoc = await singleDoc.addresses.id(address._id);
// //     newDoc .fullName = "Chaman";
// //     await newDoc.save();
// //     // console.log(await singleDoc.addresses.id(address._id));
// //   }
// //   console.log(singleDoc);
// //   await singleDoc.save();
// //   console.log(singleDoc);

// //   const childDoc = [{
// //     _id:"6841aa43a4c1c2e87e98209c",
// //   }];

//     const newDocs = [
//       {
//         fullName: "Aditya Here",
//         _id: "6841b098be442fc56a237a74",
//       },
//       //   {
//       //     fullName: "Sahil Here",
//       //   },
//       //   {
//       //     fullName: "Sachin Here",
//       //   },
//     ];
//     for(let docs of newDocs){
//         if( docs._id ){
//             let tempDoc = await singleDoc.addresses.id(docs._id);
//             for(let key in tempDoc._doc){
//                 if( key != "_id" ){
//                     console.log(key,"  ", tempDoc[key]);

//                     tempDoc[key] = docs[key];
//                 }
//             }
//             console.log(tempDoc);
            
//             // tempDoc. = docs;
//             // await tempDoc.save();
//         }
//         else{
//             await singleDoc.addresses.push(docs);
//         }
//     }
//     console.log(singleDoc);
//     await singleDoc.save();
//     console.log(singleDoc);
// }
// fun();

