"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Check,
  CheckCircle2,
  Circle,
  ClipboardList,
  ListTodo,
  Plus,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "next-todo-list-tasks"

function createTask(title) {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`

  return {
    id,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}

export default function Home() {
  const [taskText, setTaskText] = useState("")
  const [tasks, setTasks] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        setTasks(Array.isArray(savedTasks) ? savedTasks : [])
      } catch {
        setTasks([])
      } finally {
        setHasLoaded(true)
      }
    })
  }, [])

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [hasLoaded, tasks])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  const remainingCount = tasks.length - completedCount

  function handleAddTask(event) {
    event.preventDefault()

    const title = taskText.trim()
    if (!title) return

    setTasks((currentTasks) => [createTask(title), ...currentTasks])
    setTaskText("")
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,oklch(0.94_0.05_165),transparent_30%),linear-gradient(135deg,oklch(0.99_0.01_100),oklch(0.97_0.02_250))] px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-3xl flex-col justify-center gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/75 px-3 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <ClipboardList className="size-4 text-emerald-600" />
            Local task manager
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              To-Do List
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Add tasks, mark them complete, and keep your list after refresh
              with localStorage.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border/80 bg-card/95 p-4 shadow-xl shadow-slate-950/5 backdrop-blur sm:p-5">
          <form
            onSubmit={handleAddTask}
            className="grid gap-3 sm:grid-cols-[1fr_auto]"
          >
            <div className="relative">
              <ListTodo className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                placeholder="Add a new task..."
                aria-label="New task"
                className="h-11 pl-9"
              />
            </div>
            <Button type="submit" size="lg" className="h-11">
              <Plus data-icon="inline-start" />
              Add task
            </Button>
          </form>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat label="Total" value={tasks.length} />
            <Stat label="Active" value={remainingCount} />
            <Stat label="Done" value={completedCount} />
          </div>

          <div className="mt-5 space-y-2">
            {!hasLoaded ? (
              <EmptyState title="Loading tasks" />
            ) : tasks.length === 0 ? (
              <EmptyState title="Your task list is clear" />
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-3">
      <p className="text-xl font-semibold leading-none">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase text-muted-foreground">
        {label}
      </p>
    </div>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-border bg-background px-3 py-3 shadow-sm transition-colors",
        task.completed && "bg-muted/50"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-lg border border-input text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          task.completed &&
            "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
        )}
        aria-label={task.completed ? "Mark task as active" : "Mark task done"}
      >
        {task.completed ? (
          <Check className="size-4" />
        ) : (
          <Circle className="size-4" />
        )}
      </button>

      <p
        className={cn(
          "min-w-0 break-words text-sm font-medium",
          task.completed && "text-muted-foreground line-through"
        )}
      >
        {task.title}
      </p>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        aria-label={`Delete ${task.title}`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 />
      </Button>
    </div>
  )
}

function EmptyState({ title }) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-4 py-8 text-center">
      <CheckCircle2 className="size-9 text-emerald-600" />
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a task above to start organizing your day.
      </p>
    </div>
  )
}
