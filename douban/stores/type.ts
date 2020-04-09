import { BookState } from 'douban/stores/state/book/type';
import { MovieState } from 'douban/stores/state/movie/type';
import { MusicState } from 'douban/stores/state/music/type';

export type StateType = {
	book: BookState;
	music: MusicState;
	movie: MovieState;
};
