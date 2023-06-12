import Intent from "./Intent.js";
class IntentManager {
  static activities = [];
  constructor() {}

  static setActivity(activity, Intent) {
    activity.manager = IntentManager;
    IntentManager.activities.push(activity);
    const usePrev = IntentManager.activities.at(
      IntentManager.activities.indexOf(this) - 1
    );

    activity.hasPrev = usePrev ? true : false;
    activity.prev = usePrev;
  }

  static getCurrentActivity() {
    return IntentManager.activities.at(-1);
  }

  static hasPrev() {
    return IntentManager.length > 1;
  }

  static getPrev() {
    return IntentManager.slice(-1, 1);
  }

  static prev() {
    IntentManager.splice[(-1, 1)];
    const newActivity = IntentManager[IntentManageractivities.length - 1];
    return new newActivity();
  }

  static next() {}

  static destroy(context, timeout = 200) {
    setTimeout(() => {
      context.frame.remove();
      IntentManager.activities = IntentManager.activities.filter(
        (activity) => !Object.is(context, activity)
      );
    }, timeout);
  }
}

export const useState = function (initialValue) {
  let v = {
    value: initialValue,
  };

  function updateValue(value) {
    v.value = value;
  }
  return [v.value, updateValue];
};

export const useSetInterval = function (cd) {
  console.log(useSetInterval);
};

export default IntentManager;
