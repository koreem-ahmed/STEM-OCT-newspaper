const { db } = require("../.config/firebase");
const {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp
} = require("firebase/firestore");

const COLLECTION = "newspapers";

const getNewspapers = async (req, res) => {
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const newspapers = snapshot.docs.map((d) => ({ _id: d.id, ...d.data() }));
    res.status(200).json({ success: true, newspapers });
  } catch (error) {
    console.error("Error fetching newspapers:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createNewspaper = async (req, res) => {
  const { name, price, date, image } = req.body;

  if (!name || !price || !date || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields (name, price, date, image)"
    });
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      name,
      price: Number(price),
      date,
      image,
      createdAt: Timestamp.now()
    });

    const newDoc = await getDoc(docRef);

    res.status(201).json({
      success: true,
      message: "Newspaper created successfully",
      newspaper: { _id: docRef.id, ...newDoc.data() }
    });
  } catch (error) {
    console.error("Error creating newspaper:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateNewspaper = async (req, res) => {
  const { id } = req.params;
  const { name, price, date, image } = req.body;

  try {
    const docRef = doc(db, COLLECTION, id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return res.status(404).json({ success: false, message: "Newspaper not found" });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (price !== undefined) updates.price = Number(price);
    if (date !== undefined) updates.date = date;
    if (image !== undefined) updates.image = image;

    await updateDoc(docRef, updates);

    const updated = await getDoc(docRef);

    res.status(200).json({ success: true, data: { _id: id, ...updated.data() } });
  } catch (error) {
    console.error("Error updating newspaper:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteNewspaper = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = doc(db, COLLECTION, id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return res.status(404).json({ success: false, message: "Newspaper not found" });
    }

    await deleteDoc(docRef);

    res.status(200).json({ success: true, message: "Newspaper deleted" });
  } catch (error) {
    console.error("Error deleting newspaper:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getNewspapers,
  createNewspaper,
  updateNewspaper,
  deleteNewspaper
};
