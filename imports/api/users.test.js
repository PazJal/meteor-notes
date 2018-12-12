const expect = require('chai').expect;

import {validateNewUser} from './users';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer){
  describe('Users' , function () {
    it('should allow valid email address' , function () {
      const testUser = {
        emails: [
          {
            address: 'andrew@test.com' 
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).to.be.true;
    });

    it('should reject an invalid email' , function () {
      expect(() => {
        const testUser = {
          emails: [
            {
              address: 'andrew' 
            }
          ]
        };
        validateNewUser(testUser);
      }).to.throw();
    });
  });
}






// const add = (a,b) => {
//   if(typeof b !== 'number'){
//     return a+a;
//   }
//   return a+b;
// };

// const square = (a) => a*a;
  
// describe('add' , function () {
//   it('should add two numbers' , function () {
//     const result = add(1,2);
//     expect(result).to.equal(3);

//   });
  
//   it('should double a single number.' , function () {
//     const result = add(44);
//     expect(result).to.equal(88)
//     });  
// });


// describe('square' , function () {
//   it('should square a number' , function () {
//     const result = square(11);
//     expect(result).to.equal(121);
//   });
// });


