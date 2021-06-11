

export class Post {

    public id:string;//STORE POST ID
    public firstText: string;//STORE TEXT OF FIRST POST
    public secondText:string; //STORE TEXT OF SECOND POST
    public upVote1:number = 0;// STORE UP VOTE FOR FIRST POST
    public downVote1: number = 0;// STORE DOWN VOTE FOR FIRST POST
    public upVote2:number = 0;// STORE UP VOTE FOR SECOND POST
    public downVote2: number = 0;// STORE DOWN VOTE FOR FIRST POST
    public postType: string;// STORE POST TYPE EG: IMAGE OR TEXT
    public image1Url:String;// STORE FIRST IMAGE URL
    public image2Url:string;// STORE second image url
    public timeStamp: string;
    public userFirstName:string;
    public userLastName:string;
    public caption: string;
}