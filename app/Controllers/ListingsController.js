import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";
import { housesService } from "../Services/HousesService.js";
import { jobsService } from "../Services/JobsServcie.js";
import { listingsService } from "../Services/ListingsService.js";

function _drawListings()
{
    let listingsTemplate = "";
    ProxyState.listingTypes[ProxyState.currentListingType].listings.forEach(v => listingsTemplate += v.ListingTemplate);
    document.getElementById("listings").innerHTML = listingsTemplate;
}

function _drawListingsType()
{
    document.getElementById("new-listing-form").innerHTML = ProxyState.listingTypes[ProxyState.currentListingType].form();
    document.getElementById("new-listing-title").innerText = `New ${ProxyState.currentListingType} listing`;
    document.getElementById("title-suffix").innerText = ` - ${ProxyState.currentListingType}`;
}

function _getCarsFormDetails(form)
{
    try
    {
        const newCarData =
        {
            make: form.make.value,
            model: form.model.value,
            price: form.price.value,
            year: form.year.value,
            color: form.color.value,
            miles: form.miles.value,
            description: form.description.value,
            image: form.image.value
        };

        carsService.addCar(newCarData);
    }
    catch(error)
    {
        console.error(error.message);
    }
}

function _getHousesFormDetails(form)
{
    try
    {
        const newHouseData =
        {
            address:
            {
                number: form.number.value,
                street: form.street.value,
                city: form.city.value,
                state: form.state.value
            },
            squareFootage: form.squareFootage.value,
            fullBaths: form.fullBaths.value,
            halfBaths: form.halfBaths.value,
            bedrooms: form.bedrooms.value,
            floors: form.floors.value,
            price: form.price.value,
            image: form.image.value,
            description: form.description.value
        };

        housesService.addHouse(newHouseData);
    }
    catch(error)
    {
        console.error(error.message);
    }
}

function  _getJobsFormDetails(form)
{
    try
    {
        const newJobData =
        {
            title: form.title.value,
            salary: form.salary.value,
            address:
            {
                number: form.number.value,
                street: form.street.value,
                city: form.city.value,
                state: form.state.value
            },
            startHour: form.startHour.value,
            endHour: form.endHour.value,
            daysWorked: 
            {
                monday: form.monday.checked,
                tuesday: form.tuesday.checked,
                wednesday: form.wednesday.checked,
                thursday: form.thursday.checked,
                friday: form.friday.checked,
                saturday: form.saturday.checked,
                sunday: form.sunday.checked
            },
            description: form.description.value,
            companyName: form.companyName.value
        };

        jobsService.addJob(newJobData);
    }
    catch(error)
    {
        console.error(error.message);
    }
}

export class ListingsController
{
    constructor()
    {
        ProxyState.on("currentListingType", _drawListings);
        ProxyState.on("listingTypes", _drawListings);
        ProxyState.on("currentListingType", _drawListingsType);

        _drawListings();
        _drawListingsType();
    }

    swtichListingsTo(listing)
    {
        try
        {
            listingsService.switchListingsTo(listing);
            bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("listings-menu")).hide();
        }
        catch(error)
        {
            console.error(error.message);
        }
    }

    addListing()
    {
        try
        {
            window.event.preventDefault();
            const form = window.event.target;
        
            // REVIEW this is janky
            switch(ProxyState.currentListingType)
            {
                case 'cars':
                    _getCarsFormDetails(form);
                    break;

                case 'houses':
                    _getHousesFormDetails(form);
                    break;

                case 'jobs':
                    _getJobsFormDetails(form);
                    break;
            }

            bootstrap.Modal.getOrCreateInstance(document.getElementById("new-listing-modal")).hide();
        }
        catch(error)
        {
            console.error(error.message);
        }
    }
}