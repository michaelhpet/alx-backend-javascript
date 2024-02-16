export default function guardrail(mathFunction) {
  const queue = [];
  try {
    const toAdd = mathFunction();
    queue.push(toAdd);
  } catch (error) {
    queue.push(String(error));
  }
  queue.push('Guardrail was processed');
  return queue;
}
