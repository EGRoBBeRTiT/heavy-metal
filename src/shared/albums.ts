export enum Band {
    BLACK_SABBATH = 'Black Sabbath',
    MANOWAR = 'Manowar',
    PANTERA = 'Pantera',
    RAINBOW = 'Rainbow',
    ELF = 'Elf',
    DIO = 'DIO',
}

export interface AlbumType {
    band: Band;
    album: string;
    imageSrc: string;
    releasedAt: Date;
    songs?: string[];
    link?: string;
}

const albums: AlbumType[] = [
    {
        band: Band.BLACK_SABBATH,
        album: 'Black Sabbath',
        imageSrc: '/albums/Black-Sabbath_1970_Black-Sabbath.png',
        releasedAt: new Date('1970-02-13'),
        songs: [
            'Black Sabbath',
            'The Wizard',
            'Behind the Wall of Sleep',
            'N.I.B.',
            "Evil Woman (Don't Play Your Games with Me)",
            'Sleeping Village',
            'Warning',
            'Wicked World',
        ],
        link: 'https://music.apple.com/ru/album/black-sabbath-remastered/1438648677',
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Paranoid',
        imageSrc: '/albums/Black-Sabbath_1970_Paranoid.png',
        releasedAt: new Date('1970-09-18'),
        songs: [
            "War Pigs / Luke's Wall",
            'Paranoid',
            'Planet Caravan',
            'Iron Man',
            'Electric Funeral',
            'Hand of Doom',
            'Rat Salad',
            'Jack the Stripper / Fairies Wear Boots',
        ],
        link: 'https://music.apple.com/ru/album/paranoid/1533659667',
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Master of Reality',
        imageSrc: '/albums/Black-Sabbath_1971_Master-of-Reality.png',
        releasedAt: new Date('1971-07-21'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Black Sabbath Vol. 4',
        imageSrc: '/albums/Black-Sabbath_1972_Black-Sabbath-Vol-4.png',
        releasedAt: new Date('1972-09-25'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Sabbath Bloody Sabbath',
        imageSrc: '/albums/Black-Sabbath_1973_Sabbath-Bloody-Sabbath.png',
        releasedAt: new Date('1973-12-01'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Sabotage',
        imageSrc: '/albums/Black-Sabbath_1975_Sabotage.png',
        releasedAt: new Date('1975-07-28'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Technical Ecstasy',
        imageSrc: '/albums/Black-Sabbath_1976_Technical-Ecstasy.png',
        releasedAt: new Date('1976-09-25'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Never Say Die!',
        imageSrc: '/albums/Black-Sabbath_1978_Never-Say-Die.png',
        releasedAt: new Date('1978-09-28'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Heaven & Hell',
        imageSrc: '/albums/Black-Sabbath_1980_Heaven-and-Hell.png',
        releasedAt: new Date('1980-04-25'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Mob Rules',
        imageSrc: '/albums/Black-Sabbath_1981_Mob-Rules.png',
        releasedAt: new Date('1981-11-04'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: 'Dehumanizer',
        imageSrc: '/albums/Black-Sabbath_1992_Dehumanizer.png',
        releasedAt: new Date('1992-06-22'),
    },
    {
        band: Band.BLACK_SABBATH,
        album: '13',
        imageSrc: '/albums/Black-Sabbath_2013_13.png',
        releasedAt: new Date('2013-06-10'),
    },
    {
        band: Band.MANOWAR,
        album: 'Battle Hymns',
        imageSrc: '/albums/Manowar_1982_Battle-Hymns.png',
        releasedAt: new Date('1982-06-07'),
    },
    {
        band: Band.MANOWAR,
        album: 'Into Glory Ride',
        imageSrc: '/albums/Manowar_1983_Into-Glory-Ride.png',
        releasedAt: new Date('1983-07-01'),
    },
    {
        band: Band.MANOWAR,
        album: 'Hail to England',
        imageSrc: '/albums/Manowar_1984_Hail-to-England.png',
        releasedAt: new Date('1984-02-01'),
    },
    {
        band: Band.MANOWAR,
        album: 'Sign of the Hammer',
        imageSrc: '/albums/Manowar_1984_Sign-of-the-Hammer.png',
        releasedAt: new Date('1984-10-15'),
    },
    {
        band: Band.MANOWAR,
        album: 'Fighting the World',
        imageSrc: '/albums/Manowar_1987_Fighting-the-World.png',
        releasedAt: new Date('1987-02-17'),
    },
    {
        band: Band.MANOWAR,
        album: 'Kings of Metal',
        imageSrc: '/albums/Manowar_1988_Kings-of-Metal.png',
        releasedAt: new Date('1988-11-18'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Triumph of Steel',
        imageSrc: '/albums/Manowar_1992_The-Triumph-of-Steel.png',
        releasedAt: new Date('1992-09-29'),
    },
    {
        band: Band.MANOWAR,
        album: 'Louder Than Hell',
        imageSrc: '/albums/Manowar_1996_Louder-Than-Hell.png',
        releasedAt: new Date('1996-04-29'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Dawn of Battle',
        imageSrc: '/albums/Manowar_2002_The-Dawn-of-Battle.png',
        releasedAt: new Date('2002-10-15'),
    },
    {
        band: Band.MANOWAR,
        album: 'Warriors of the World',
        imageSrc: '/albums/Manowar_2002_Warriors-of-the-World.png',
        releasedAt: new Date('2002-06-04'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Sons of Odin',
        imageSrc: '/albums/Manowar_2006_The-Sons-of-Odin.png',
        releasedAt: new Date('2006-06-20'),
    },
    {
        band: Band.MANOWAR,
        album: 'Gods of War',
        imageSrc: '/albums/Manowar_2007_Gods-of-War.png',
        releasedAt: new Date('2007-02-23'),
    },
    {
        band: Band.MANOWAR,
        album: 'Thunder In the Sky',
        imageSrc: '/albums/Manowar_2009_Thunder-In-the-Sky.png',
        releasedAt: new Date('2009-06-13'),
    },
    {
        band: Band.MANOWAR,
        album: 'Battle Hymns',
        imageSrc: '/albums/Manowar_2011_Battle-Hymns.png',
        releasedAt: new Date('2011-11-26'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Lord of Steel',
        imageSrc: '/albums/Manowar_2012_The-Lord-of-Steel.png',
        releasedAt: new Date('2012-06-16'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Lord of Steel (Hammer Edition)',
        imageSrc: '/albums/Manowar_2012_The-Lord-of-Steel-Hammer-Edition.png',
        releasedAt: new Date('2012-06-16'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Final Battle I',
        imageSrc: '/albums/Manowar_2019_The-Final-Battle.png',
        releasedAt: new Date('2019-03-29'),
    },
    {
        band: Band.MANOWAR,
        album: 'Into Glory Ride Imperial Edition MMXIX',
        imageSrc: '/albums/Manowar_2019_Into-Glory-Ride.png',
        releasedAt: new Date('2019-03-29'),
    },
    {
        band: Band.MANOWAR,
        album: 'Hail to England Imperial Edition MMXIX',
        imageSrc: '/albums/Manowar_2019_Hail-to-England.png',
        releasedAt: new Date('2019-03-29'),
    },
    {
        band: Band.MANOWAR,
        album: 'The Revenge of Odysseus (Highlights)',
        imageSrc: '/albums/Manowar_2022_The-Revenge-of-Odysseus.png',
        releasedAt: new Date('2022-06-22'),
    },
    {
        band: Band.MANOWAR,
        album: 'Laut Und Hart Stark Und Schnell',
        imageSrc: '/albums/Manowar_2023_Laut-Und-Hart-Stark-Und-Schnell.png',
        releasedAt: new Date('2023-02-10'),
    },
    {
        band: Band.PANTERA,
        album: 'Cowboys from Hell',
        imageSrc: '/albums/Pantera_1990_Cowboys-from-Hell.png',
        releasedAt: new Date('1990-07-24'),
    },
    {
        band: Band.PANTERA,
        album: 'Vulgar Display of Power',
        imageSrc: '/albums/Pantera_1992_Vulgar-Display-of-Power.png',
        releasedAt: new Date('1992-02-25'),
    },
    {
        band: Band.PANTERA,
        album: 'Far Beyond Driven',
        imageSrc: '/albums/Pantera_1994_Far-Beyond-Driven.png',
        releasedAt: new Date('1994-03-22'),
    },
    {
        band: Band.PANTERA,
        album: 'The Great Southern Trendkill',
        imageSrc: '/albums/Pantera_1996_The-Great-Southern-Trendkill.png',
        releasedAt: new Date('1996-05-07'),
    },
    {
        band: Band.PANTERA,
        album: 'Official Live: 101 Proof',
        imageSrc: '/albums/Pantera_1997_101-Proof.png',
        releasedAt: new Date('1997-07-14'),
    },
    {
        band: Band.PANTERA,
        album: 'Reinventing the Steel',
        imageSrc: '/albums/Pantera_2000_Reinventing-the-Steel.png',
        releasedAt: new Date('2000-03-21'),
    },
    {
        band: Band.RAINBOW,
        album: "Ritchie Blackmore's Rainbow",
        imageSrc: '/albums/Rainbow_1975_Ritchie-Blackmores-Rainbow.png',
        releasedAt: new Date('1975-05-17'),
    },
    {
        band: Band.RAINBOW,
        album: 'Rising',
        imageSrc: '/albums/Rainbow_1976_Rising.png',
        releasedAt: new Date('1976-05-15'),
    },
    {
        band: Band.RAINBOW,
        album: "Long Live Rock 'n' Roll",
        imageSrc: '/albums/Rainbow_1978_Long-Live-Rock-N-Roll.png',
        releasedAt: new Date('1978-04-09'),
    },
    {
        band: Band.ELF,
        album: 'Elf',
        imageSrc: '/albums/Elf_1972_Elf.png',
        releasedAt: new Date('1972-08-15'),
    },
    {
        band: Band.ELF,
        album: 'Carolina County Ball',
        imageSrc: '/albums/Elf_1974_Carolina-County-Ball.png',
        releasedAt: new Date('1974-04-15'),
    },
    {
        band: Band.ELF,
        album: 'Trying to Burn the Sun',
        imageSrc: '/albums/Elf_1975_Trying-to-Burn-the-Sun.png',
        releasedAt: new Date('1975-06-01'),
    },
    {
        band: Band.DIO,
        album: 'Holy Diver',
        imageSrc: '/albums/Dio_1983_Holy-Diver.png',
        releasedAt: new Date('1983-05-25'),
        link: 'https://music.apple.com/ru/album/holy-diver-remastered/1440757603',
        songs: [
            'Stand Up and Shout',
            'Holy Diver',
            'Gypsy',
            'Caught In the Middle',
            "Don't Talk to Strangers",
            'Straight Through the Heart',
            'Invisible',
            'Rainbow In the Dark',
            'Shame On the Night',
        ],
    },
] as const;

export const ALBUMS: AlbumType[] = [...albums].sort(
    (a, b) => a.releasedAt.getTime() - b.releasedAt.getTime(),
);
