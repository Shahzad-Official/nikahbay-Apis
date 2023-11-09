import { Router } from "express";
import CountryController from "../controllers/country_controller.js";

const countryRouter= Router();
countryRouter.get("/countries",CountryController.getCountries);
countryRouter.get("/states",CountryController.getStatesByCountryCode);
countryRouter.get("/cities",CountryController.getCityByStateAndCountryCode);

export default countryRouter;