import { BookState } from 'douban/stores/book/type';
import { MovieState } from 'douban/stores/movie/type';
import { MusicState } from 'douban/stores/music/type';

export type StateType = {
	book: BookState;
	music: MusicState;
	movie: MovieState;
};
