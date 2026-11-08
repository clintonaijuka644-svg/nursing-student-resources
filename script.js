import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbUUH_LZGOTReYAbMTw5jrExOpEPpMhPU",
  authDomain: "nursing-students-resources.firebaseapp.com",
  projectId: "nursing-students-resources",
  storageBucket: "nursing-students-resources.firebasestorage.app",
  messagingSenderId: "690277296044",
  appId: "1:690277296044:web:d670f612053e65ac1f3c09"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
async function loadOnlineFlashcards() {
    try {
        const snapshot = await getDocs(collection(db, "flashcards"));

        snapshot.forEach((doc) => {
            const card = doc.data();
            const subject = card.subject.toLowerCase();

            if (window.decks && window.decks[subject]) {
                window.decks[subject].push({
                    question: card.question,
                    answer: card.answer
                });
            }
        });

        if (typeof window.displayCard === "function") {
            window.displayCard();
        }

        console.log("Online flashcards loaded successfully.");
    } catch (error) {
        console.error("Error loading flashcards:", error);
    }
}

loadOnlineFlashcards();