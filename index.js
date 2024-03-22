const express = require("express");
const app = express();
const uuid = require("uuid");

// Middleware to parse JSON bodies
app.use(express.json());

//Log Requests (Morgan Middleware)
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.use(requestTime);

//define topMovies
let topMovies = [
    {
        movieId: '01',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        synopsis: 'Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents and their mysterious deaths.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '001',
                name: 'Chris Columbus',
                bio: 'Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.',
                birthyear: '1958',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0001',
                name: 'Adventure Fantasy',
                description: 'A type of adventure film where the action takes place in imaginary lands with strange beasts, wizards and witches. These films contain many of the elements of the sword-and-sorcery film, but are not necessarily bound to the conventions of the sword and magic.',
            },
    },
    {
        movieId: '02',
        title: 'Inside Out',
        synopsis: 'Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco. Rileys emotions -- led by Joy (Amy Poehler) -- try to guide her through this difficult, life-changing event. However, the stress of the move brings Sadness (Phyllis Smith) to the forefront. When Joy and Sadness are inadvertently swept into the far reaches of Rileys mind, the only emotions left in Headquarters are Anger, Fear and Disgust.',
        imagePath: 'image.png',
        year: '2015',
        director: 
            {
                directorId: '002',
                name: 'Peter Docter',
                bio: 'Peter Hans Docter is an American film director, producer, screenwriter, and animator. He has served as the chief creative officer of Pixar Animation Studios since 2018, and is best known for directing the animated feature films Monsters, Inc., Up, Inside Out, and Soul.',
                birthyear: '1968',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0002',
                name: 'Fantasy Comedy',
                description: 'Fantasy comedy films are types of films that uses magic, supernatural and or mythological figures for comic purposes. Most fantasy comedy includes an element of parody, or satire, turning many of the fantasy conventions on their head such as the hero becoming a cowardly fool, the princess being a klutz.',
            },
    },
    {
        movieId: '03',
        title: 'Bourne Identity',
        synopsis: 'The story of a man (Matt Damon), salvaged, near death, from the ocean by an Italian fishing boat. When he recuperates, the man suffers from total amnesia, without identity or background... except for a range of extraordinary talents in fighting, linguistic skills and self-defense that speak of a dangerous past. He sets out on a desperate search-assisted by the initially rebellious Marie (Franka Potente) - to discover who he really is, and why he is being lethally pursued by assassins.',
        imagePath: 'image.png',
        year: '2002',
        director: 
            {
                directorId: '003',
                name: 'Doug Liman',
                bio: 'Douglas Eric Liman is an American film director and producer. He is known for directing the films Swingers, Go, The Bourne Identity, Mr. & Mrs. Smith, Jumper, Edge of Tomorrow, and American Made. Most of his career has been associated with the production company Hypnotic.',
                birthyear: '1965',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0003',
                name: 'Action Thriller',
                description: 'Action thriller is a blend of both action and thriller film in which the protagonist confronts dangerous adversaries, obstacles, or situations which he/she must conquer, normally in an action setting.',
            },
    },
    {
        movieId: '04',
        title: 'Love Actually',
        synopsis: 'Nine intertwined stories examine the complexities of the one emotion that connects us all: love. Among the characters explored are David (Hugh Grant), the handsome newly elected British prime minister who falls for a young junior staffer (Martine McCutcheon), Sarah (Laura Linney), a graphic designer whose devotion to her mentally ill brother complicates her love life, and Harry (Alan Rickman), a married man tempted by his attractive new secretary.',
        imagePath: 'image.png',
        year: '2003',
        director: 
            {
                directorId: '004',
                name: 'Richard Curtis',
                bio: 'Richard Whalley Anthony Curtis CBE (born 8 November 1956) is a British screenwriter, producer and film director. One of Britains most successful comedy screenwriters, he is known primarily for romantic comedy films.',
                birthyear: '1956',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0004',
                name: 'Romantic Comedy',
                description: 'Romantic comedy is a subgenre of comedy and romance fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.',
            },
    },
    {
        movieId: '05',
        title: 'What A Girl Wants',
        synopsis: 'On a whim, American teenager Daphne (Amanda Bynes) boards a plane to England to find the father she never met. Upon arriving there, though, she makes a startling discovery: The man she is looking for is Lord Henry Dashwood (Colin Firth), a member of the British upper class, who is running for political office. Lord Henry did not know Daphne existed, but he welcomes her into his life. However, she is not so sure -- and his family and his current betrothed look on her disapprovingly.',
        imagePath: 'image.png',
        year: '2003',
        director: 
            {
                directorId: '005',
                name: 'Dennie Gordon',
                bio: 'Dennie Gordon is an American film and television director. Her directorial television credits include Party of Five, Sports Night, Ally McBeal, The Practice, Grounded for Life, The Loop, White Collar, Burn Notice, Hell on Wheels, Waco, The Office and other series.',
                birthyear: '1953',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0005',
                name: 'Comedy',
                description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humourous or amusing by inducing laughter.',
            },
    },
    {
        movieId: '06',
        title: 'The Princess Diaries',
        synopsis: 'Shy San Francisco teenager Mia Thermopolis (Anne Hathaway) is thrown for a loop when, from out of the blue, she learns the astonishing news that she is a real-life princess! As the heir apparent to the crown of the small European principality of Genovia, Mia begins a comical journey toward the throne when her strict and formidable grandmother, Queen Clarisse Renaldi (Julie Andrews), shows up to give her princess lessons.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '006',
                name: 'Gary Marhsall',
                bio: 'Garry Kent Marshall was an American screenwriter, film director, producer and actor. Marshall began his career in the 1960s as a writer for The Lucy Show and Dick Van Dyke Show until he developed the television adaptation of Neil Simons play The Odd Couple.',
                birthyear: '1934',
                deathyear: '2016',
            },
        genre: 
            { 
                genreId: '0005',
                name: 'Comedy',
                description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humourous or amusing by inducing laughter.',
            },
    },
    {
        movieId: '07',
        title: 'The Santa Clause',
        synopsis: 'Divorced dad Scott (Tim Allen) has custody of his son (Eric Lloyd) on Christmas Eve. After he accidentally kills a man in a Santa suit, they are magically transported to the North Pole, where an elf explains that Scott must take Santas place before the next Christmas arrives. Scott thinks hes dreaming, but over the next several months he gains weight and grows an inexplicably white beard. Maybe that night at the North Pole was not a dream after all -- and maybe Scott has a lot of work to do.',
        imagePath: 'image.png',
        year: '1994',
        director: 
            {
                directorId: '007',
                name: 'John Pasquin',
                bio: 'John Pasquin is an American director of film, television and theatre.',
                birthyear: '1944',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0005',
                name: 'Comedy',
                description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humourous or amusing by inducing laughter.',
            },
    },
    {
        movieId: '08',
        title: 'The Lord of the Rings',
        synopsis: 'In the Second Age of Middle-earth, the lords of Elves, Dwarves, and Men are given Rings of Power. Unbeknownst to them, the Dark Lord Sauron forges the One Ring in Mount Doom, instilling into it a great part of his power, to dominate the other Rings and conquer Middle-earth.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '008',
                name: 'Peter Jackson',
                bio: 'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien.',
                birthyear: '1961',
                deathyear: 'N/A',
            },
        genre: 
            {
                genreId: '0001',
                name: 'Adventure Fantasy',
                description: 'A type of adventure film where the action takes place in imaginary lands with strange beasts, wizards and witches. These films contain many of the elements of the sword-and-sorcery film, but are not necessarily bound to the conventions of the sword and magic.',
            },
    },
    {
        movieId: '09',
        title: 'Casablanca',
        synopsis: 'Rick Blaine (Humphrey Bogart), who owns a nightclub in Casablanca, discovers his old flame Ilsa (Ingrid Bergman) is in town with her husband, Victor Laszlo (Paul Henreid). Laszlo is a famed rebel, and with Germans on his tail, Ilsa knows Rick can help them get out of the country.',
        imagePath: 'image.png',
        year: '1942',
        director:
            {
                directorId: '009',
                name: 'Michael Curtiz',
                bio: 'Michael Curtiz was a Hungarian-American film director, recognized as one of the most prolific directors in history. He directed classic films from the silent era and numerous others during the Golden Age of Hollywood, when the studio system was prevalent.',
                birthyear: '1886',
                deathyear: '1962',
            },
        genre: 
            { 
                genreId: '0006',
                name: 'Romance',
                description: 'This genre focuses on the relationship and romantic love between two people, typically with an emotionally satisfying and optimistic ending,',
            },
    },
    {
        movieId: '10',
        title: 'The Martian',
        synopsis: 'When astronauts blast off from the planet Mars, they leave behind Mark Watney (Matt Damon), presumed dead after a fierce storm. With only a meager amount of supplies, the stranded visitor must utilize his wits and spirit to find a way to survive on the hostile planet. Meanwhile, back on Earth, members of NASA and a team of international scientists work tirelessly to bring him home, while his crew mates hatch their own plan for a daring rescue mission.',
        imagePath: 'image.png',
        year: '2015',
        director:
            {
                directorId: '010',
                name: 'Ridley Scott',
                bio: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.',
                birthyear: '1937',
                deathyear: 'N/A',
            },
        genre: 
            { 
                genreId: '0007',
                name: 'Science Fiction',
                description: 'Science fiction is a genre of speculative fiction dealing with imaginative concepts such as futuristic science and technology, space travel, time travel, faster than light travel, parallel universes and extraterrestrial life.',
            },
    },
];

// define Users
let users = [
    {
        userId: '00aaa0000a0000a0',
        userName: 'TestUser',
        password: '0000',
        email: 'test@email.com',
        birthday: '00/00/0000',
        favoriteMovies: [
          '1', '2'
        ]
}
];

app.get('/', (req, res) => {
    let responseText = 'Your Top Movies';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});

app.get('/secreturl', (req, res) => {
    let responseText = 'This is a secret url with super top-secret content.';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Returns a list of all movies to the user
app.get('/movies' , (req, res) => {
    res.json(topMovies);
});

// Returns data (description, genre, director, image URL) about a single movie by title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => movie.title === req.params.title));
});

// Returns data about a genre by name/title
app.get('/movies/genres/:genreName', (req, res) => {
    const genreName = req.params.genreName;
    const movies = topMovies.filter((movie) => movie.genre.name === genreName);

    if (movies.length > 0) {
        const genreInfo = {
            genreName: genreName,
            description: movies[0].genre.description,
            movies: movies.map(movie => ({
                title: movie.title,
            }))
        };
        res.json(genreInfo);
    } else {
        res.status(404).send('Genre with the name ' + genreName + ' was not found.');
    }
});

// Returns data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
    const directorName = req.params.directorName;
    const director = topMovies.find((movie) => movie.director.name === directorName)?.director;

    if (director) {
        const directorInfo = {
            name: director.name,
            bio: director.bio,
            birthyear: director.birthyear,
            deathyear: director.deathyear
        };
        res.json(directorInfo);
    } else {
        res.status(404).send('Director with the name ' + directorName + ' was not found.');
    }
});

// Allows new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!isValidUser(newUser)) {
        return res.status(400).json({ error: 'Invalid user data.' });
    }
    newUser.userId = generateUUID();
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully.', userId: newUser.userId });
});

function isValidUser(user) {
    return user && 
        typeof user.userName === 'string' &&
        typeof user.password === 'string' &&
        typeof user.email === 'string' &&
        typeof user.birthday === 'string';
}

function generateUUID() {
    return uuid.v4();
}
   
// Allows users to update their user info (birthday)
app.put('/users/:userName', (req, res) => {
    const userId = req.params.userId;
    const updatedFields = req.body;

    const userIndex = users.findIndex(user => user.userId === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User with the ID `${userId}` was not found.' });
    }

    const user = users[userIndex];

    // Update user's information
    for (const field in updatedFields) {
        if (Object.prototype.hasOwnProperty.call(updatedFields, field)) {
            switch (field) {
                case 'userName':
                    user.userName = updatedFields.userName;
                    break;
                case 'password':
                    user.password = updatedFields.password;
                    break;
                case 'email':
                    user.email = updatedFields.email;
                    break;
                case 'birthday':
                    if (!isValidDateFormat(updatedFields.birthday)) {
                        return res.status(400).json({ error: 'Invalid birthday format. Please provide a valid date in format MM/DD/YYYY.'});
                    }
                    user.birthday = updatedFields.birthday;
                    break;
                case 'favortieMovies':
                    user.favoriteMovies = updatedFields.favoriteMovies;
                    break;
                default:
                    // Ignore unknown fields
                    break;
            }
        }
    }
    // Sucess response
    res.status(200).json({ message: 'User with ID `${userId}` was updated successfully.'});
});

// Function validates date format (MM/DD/YYYY)
function isValidDateFormat(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    return regex.test(dateString);
}

// Allows users to add a movie to their list of favorites
app.post('/users/:userName/movies/:movieID', (req, res) => {
    let user = users.find((user) => user.userName === req.params.userName);

    if (!user) {
        res.status(404).send('User with the name ' + req.params.userName + ' was not found.');
    } else {
        let movieId = req.params.movieId;
        if (!user.favoriteMovies.includes(movieId)) {
            user.favoriteMovies.push(movieId);
            res.status(201).send('Movie ' + movieId + ' was added to favorites for user ' + req.params.userName);
        } else {
            res.status(400).send('Movie ' + movieId + ' is already in favorties for user ' + req.params.userName);
        }
    }
});

// Allows users to remove a movie from their list of favorites
app.delete('/users/:userName/movies/:movieID', (req, res) => {
    let user = users.find((user) => user.userName === req.params.userName );

    if (!user) {
        res.status(404).send('User with the name ' + req.params.userName + ' was not found.');
    } else {
        let movieId = req.params.movieId;
        if (user.favoriteMovies.includes(movieId)) {
            user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
            res.status(200).send('Movie ' + movieId + ' was removied from favorites for user ' + req.params.userName);
        } else {
            res.status(400).send('Movie ' + movieId + ' is not in favorites for user ' + req.params.userName);
        }
    }
});

// Allows existing users to deregister 
app.delete('/users/:userName', (req, res) => {
    let index = users.findIndex((user) => user.userName === req.params.userName);

    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).send('User ' + req.params.userName + ' was deleted.');
    } else {
        res.status(404).send('User with the name ' + req.params.userName + ' was not found.');
    }
});

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
