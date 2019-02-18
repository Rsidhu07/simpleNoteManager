import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Notes = new Mongo.Collection('notes');

Meteor.methods({
        
    'notes-insert'(text){

        check(text, String);

        if(!Meteor.userId()){
        throw new Meteor.error('Not-authorized to perform the selected operation');
        }

        Notes.insert({
            text,
            createdAt : new Date(),
            owner     : Meteor.userId(),
            username  : Meteor.user().username,
            
          });

    },
    
    'notes-remove'(note){

        check(note._id, String);

        if(note.owner !==Meteor.userId()){

            alert("You are not authorized to delete others Note!");
            throw new Meteor.error('Not authorized to delete others notes');
            
        }
        
        
        
        Notes.remove(note._id); 
        alert("Selected Note is deleted", note._id);
        

            
               
    }


});
