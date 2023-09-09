
import { User } from "./user";


class ScheduleAccessAll {
    all: boolean;
    users: User[];

    constructor(
        all: boolean,
        users: User[],
    ) {
        this.all = all;
        this.users = users;
    }
}

export { ScheduleAccessAll };