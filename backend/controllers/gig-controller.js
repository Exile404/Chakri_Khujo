import Gig from "../models/gig-model.js";
import createError from "../utils/createError.js";
import Stripe from "stripe";


export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  
  
  console.log('Hello')
  console.log(req.body);
  const newGig = new Gig({
    idNum: req.body.idNum,
    userId : req.body.userId,
    title: req.body.title,
    cat: req.body.cat,
    cover: req.body.cover,
    images: req.body.images,
    desc: req.body.desc,
    shortTitle: req.body.shortTitle,
    shortDesc: req.body.shortDesc,
    deliveryTime: req.body.deliveryTime,
    revisionNumber: req.body.revisionNumber,
    features: req.body.features,
    price: req.body.price,
    payment_intent: paymentIntent.id

  })
  try {
    await newGig.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
  
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: new RegExp(q.cat, 'i') }), // Case-insensitive cat search
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }), // Case-insensitive title search
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    console.log('Received request!'); // This will log every time a request is received

    const gigs = await Gig.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
