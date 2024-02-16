export default function guardrail(mathFunction) {
  const queue = [];
  try {
    const toAdd = mathFunction();
    queue.push(toAdd);
  } catch (error) {
    queue.push(error.message);
  }
  queue.push('Guardrail was processed');
  return queue;
}
