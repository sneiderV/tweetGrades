import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

//manejo de collection en Mongo
export const Students = new Mongo.Collection("students");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });
}