function scheduleNextUpdate(
  task: Function,
  hours: number = parseInt(process.env.SCHEDULER_TIME.split(":")[0]),
  min: number = parseInt(process.env.SCHEDULER_TIME.split(":")[1])
) {
  const now = new Date();
  const nextUpdate = new Date(now);

  nextUpdate.setHours(hours, min, 0, 0);

  // Если текущее время позже или равно указанному времени, переходим к следующему дню
  if (
    now.getHours() > hours ||
    (now.getHours() === hours && now.getMinutes() >= min)
  ) {
    nextUpdate.setDate(nextUpdate.getDate() + 1);
  }

  const timeUntilNextUpdate = +nextUpdate - +now;

  setTimeout(() => {
    task();
    scheduleNextUpdate(task, hours, min);
  }, timeUntilNextUpdate);
}
export { scheduleNextUpdate }