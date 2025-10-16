<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequestValidate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $task = $this->route('task');
        return $task && $task->user_id == $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,in_progress,completed',
            'priority' => 'rullable|in:low,medium,high',
            'due_date' => 'nullable|date|after_or_equal:today',
        ];
    }
}
