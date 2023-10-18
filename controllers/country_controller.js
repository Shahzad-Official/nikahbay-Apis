import { City, Country, State } from "country-state-city";

export default class CountryController{
    static getCountries(req,res){
        const countries=Country.getAllCountries();
       res.json({success:true,message:"Countries has been fetched successfully!",data:countries});
    }
    static getStatesByCountryCode(req,res){
        const {code}=req.query;
       
        const states=State.getStatesOfCountry(code);
       res.json({success:true,message:"States has been fetched successfully!",data:states});
    }
    static getCityByStateAndCountryCode(req,res){
        const {countryCode,stateCode}=req.query;
       
        const cities=City.getCitiesOfState(countryCode,stateCode);
       res.json({success:true,message:"Cities has been fetched successfully!",data:cities});
    }
}