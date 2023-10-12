import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String},
    startDt: {type: Date, required: true},
    endDt: {type: Date},
    creationDt: {type: Date, default: () => Date.now(), immutable: true},
    seatLimit: {type: Number},
    venue: {type: String},
    posterLoc: {type: String, 
      validate: {
        validator: function(urlString: String){
          return urlString.startsWith('http');
        }
      }
    },
    promoVideoLink: {type: String, 
      validate: {
        validator: function(urlString: String){
          return urlString.startsWith('http');
        }
      }
    },
    registerStartDt: {type: Date},
    registerEndDt: {type: Date}
});

export const EventModel = mongoose.model("Event", EventSchema);

export const getEvents = () => EventModel.find();
export const getEventById = (id: string) => EventModel.findById(id);
export const createEvent = (values: Record<string, any>) =>
  new EventModel(values).save()
  .then((event) => {
    const eventObj = event.toObject();
    return {_id: eventObj._id}
  });
export const deleteEventById = (id: string) =>
  EventModel.findOneAndDelete({ _id: id });
export const updateEventById = (id: string, values: Record<string, any>) =>
  EventModel.findByIdAndUpdate(id, values, {new: true});