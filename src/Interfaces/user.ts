export class User {
        
       public key:any;
       public email: string;
       public password: string;
       public firstName: string;
       public lastName: string;
       public imageUrl : string = 'assets/imgs/noUser.png' as string;
       public followers: number = 0;
       public following: number = 0; 
       public postId:string;
       
}