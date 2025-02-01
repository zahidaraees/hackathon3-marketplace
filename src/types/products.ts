export interface Product {
    _id : string;
    title : string;
    description: Text;
    price : number;
    dicountPercentage : number;
    isNew : boolean;

    productImage? : {asset :{
        _ref: string,
        _type: "image",

    }};

};
