import generalDocs from "./info.json";

import homeDocs from "../modules/home/home.docs.json";

export default {
    ...generalDocs,
    paths: {
        ...homeDocs,
    }
};