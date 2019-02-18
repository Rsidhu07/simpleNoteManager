import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

import './main.html';
import { Meteor } from 'meteor/meteor';

Accounts.ui.config({

  passwordSignupFields:'USERNAME_ONLY'

});

Template.body.helpers({

notes(){

console.log("notes helper called", Notes);

return Notes.find({});

}

  // notes: [

  //       {text: "My Notes 1"},
  //       {text: "My Notes 2"},
  //       {text: "My Notes 3"}
  // ],

});

 Template.add.events({

  'submit .add-form': function(){

      event.preventDefault();

      const Target = event.target;
      const text =Target.text.value;    
      console.log("Entered text is : ", text);

      //Inserting items into notes, database.
      
      // Notes.insert({
      //   text,
      //   createdAt : new Date(),
      //   owner     : Meteor.userId(),
      //   username  : Meteor.user().username,
        
      // });

      Meteor.call('notes-insert', text);

      //clear form

      Target.text.value = "";
  }  

 });

  Template.note.events({


    'click .delete' : function(){
      
      Meteor.call('notes-remove', this)
      
    }
      // 'click .delete': function()
      
      // {

      // return Notes.remove(this._id);
          
      // }

  });