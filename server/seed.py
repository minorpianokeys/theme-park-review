#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Ride, Park, Review

# Ride(
#         name = "",
#         image = "",
#         description = "",
#         height = ""

#     )



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        Ride.query.delete()
        Park.query.delete()
        Review.query.delete()
        print("Starting seed...")
        guardians = Ride(
            name = "Guardians of the Galaxy: Cosmic Rewind",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/866/488/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/guardians-of-the-galaxy-cosmic-rewind/DYS_GOTG_CosmicRewind_Composite_R4_AA_xak-16x9.jpg?2022-09-27T17:26:32+00:00",
            description = "Take off on an intergalactic chase through space and time with the Guardians of the Galaxy.",
            height = "42",
            park_id = "2"
        )
        space_mountain = Ride(
            name = "Space Mountain",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/630/354/75/dam/wdpro-assets/parks-and-tickets/attractions/magic-kingdom/space-mountain/space-mountain-00.jpg?1699632688583",
            description = "Blast off on a rip-roaring rocket into the furthest reaches of outer space on this roller-coaster ride in the dark.",
            height = "44",
            park_id = "1"
        )
        flight = Ride(
            name = "Flight of Passage",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/attractions/animal-kingdom/flight-of-passage/flight-of-passage-in-ride-16x9.jpg?1710279669923",
            description = "Board your own mountain banshee and embark on a thrilling expedition, where interstellar explorers like you get an up-close look at this moon’s incredible landscape.",
            height = "44",
            park_id = "4"
        )
        navi_river = Ride(
            name = "Navi River Journey",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/attractions/animal-kingdom/navi-river-journey/pandora-navi-river-journey-full-boat-16x9.jpg?1710279514084",
            description = "Feel a sense of wonder as the full beauty of the extraordinary dreamscape unfolds before your eyes.",
            height = "Any",
            park_id = "4"
        )
        kili_safari = Ride(
            name = "Kilimanjaro Safari",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/gallery/attractions/animal-kingdom/kilimanjaro-safaris/kilimanjaro-safaris-gallery00.jpg?1699632724944",
            description = "Explore the Harambe Wildlife Reserve, home to over 30 species living in 110 acres of picturesque open plains, shady forest landscapes and rocky wetlands. Your rugged safari vehicle is driven by an expert guide, who helps point out animals and shares fascinating wildlife facts during this extraordinary 18-minute expedition.",
            height = "Any",
            park_id = "4"
        )
        kali_river = Ride(
            name = "Kali River Rapids",
            image = "https://d3bo0mk5kk7egf.cloudfront.net/imgstore/ElementGalleryItems/attractions/Fullsize/Kali-Rapids_Full_40157.jpg",
            description = "Skim across an erupting geyser, drift below a canopy of lush vegetation and be whisked along fast-moving rapids. Graze gushing waterfalls and bedrock amid the raging current. Then, as the harmony of nature is disrupted, you’ll plummet down a dramatic 20-foot slope!",
            height = "38",
            park_id = "4"
        )
        expedition = Ride(
            name = "Expedition Everest",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/gallery/attractions/animal-kingdom/expedition-everest/expedition-everest-gallery00.jpg?1699632744324",
            description = "Wander into a Tibetan village at the base of Mount Everest and board a train to the “top of the world.” Beware: Some say a legendary snow monster lives deep in the mountain.",
            height = "44",
            park_id = "4"
        )
        dinosaur = Ride(
            name = "Dinosaur",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/attractions/animal-kingdom/dinosaur/dinosaur-00.jpg?1689787641464",
            description = "A paleontologist recruits you for a secret mission to bring a 3.5-ton Iguanadon back to the present. There’s just one problem—the giant meteor that wiped out life on Earth is on the way! ",
            height = "40",
            park_id = "4"
        )
        # flight = Ride(
        #     name = "",
        #     image = "",
        #     description = "",
        #     height = "",
        #     park_id = "4"
        # )



        
        mk = Park(
            name = "Magic Kingdom",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/715/715/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/cinderella-castle/0724ZQ_0332MS_ALT-SKY_JLM-1x1.jpg?2023-03-14T13:50:52+00:00"
        )
        epcot = Park(
            name = "Epcot",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/715/715/75/dam/disney-world/destinations/epcot/epcot-monorail-1x1.jpg?1722458001279"
        )
        hs = Park(
            name = "Hollywood Studios",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/715/715/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/hollywood-tower-of-terror/Disneys-Hollywood-Studios-27-1x1.jpg?2022-10-17T22:51:47+00:00"
        )
        dak = Park(
            name = "Animal Kingdom",
            image = "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/715/715/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/tree-of-life/tree-of-life-gallery01-1x1.jpg?2022-03-10T19:45:10+00:00"
        )

        print('Adding Ride Objects to DB...')
        db.session.add_all([guardians, space_mountain, mk, epcot, hs, dak, flight, navi_river, kili_safari, kali_river, expedition, dinosaur,])
        print('Committing to DB...')
        db.session.commit()
        print('Complete.')
        


