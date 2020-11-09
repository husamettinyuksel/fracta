export const mapOptions = {
  center: {
    type: Array,
    required: false,
    default: () =>  [-122.271408,
    37.558588]
  },
  minZoom: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: 16
  },
};
